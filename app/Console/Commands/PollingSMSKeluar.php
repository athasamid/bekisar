<?php

namespace App\Console\Commands;

use App\Events\OutboxEvent;
use App\Events\PhoneEvent;
use App\Inbox;
use App\Outbox;
use App\Phones;
use App\Serializers\DataArraySansIncludeSerializer;
use App\Transformers\OutboxTransformer;
use App\Transformers\PhoneTransformer;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client as Guzzle;

class PollingSMSKeluar extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sms:polling';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Log::info("Running polling");
        $params = [];

        $phones = Phones::get();

        $params['phones'] = fractal()
            ->collection($phones)
            ->serializeWith(DataArraySansIncludeSerializer::class)
            ->transformWith(PhoneTransformer::class)
            ->toArray()['data'];

        event(new PhoneEvent($params['phones']));

        $inbox = Inbox::where('processed', false)->get();
        $params['inbox'] = [];
        if (count($inbox)){
            foreach ($inbox as $row){
                $params['inbox'][] = [
                    'from' => $row->SenderNumber,
                    'message' => $row->TextDecoded
                ];
                $data = fractal()
                    ->item($row)
                    ->transformWith(OutboxTransformer::class)
                    ->serializeWith(DataArraySansIncludeSerializer::class)
                    ->toArray();
                event(new OutboxEvent($data));
            }
        }

        $this->sendPolling($params);


    }

    function sendPolling($params){
        $client = new Guzzle();

        try {
            $response = $client->request('POST', env('POLLING_URL'), [
                'headers' => [
                    'content_type' => 'application/x-www-form-urlencoded',
                    'app_key' => 'base64:75rY/TC4fdqq3Zp3gsKoNR7nOl6N8bnqRfW3HXtGe3U='
                ],
                'form_params' => $params
            ]);

            $body = json_decode($response->getBody());

            if ($response->getStatusCode() == 200){
                if (isset($body['sms']) && count($body['sms'])){
                    foreach ($body['sms'] as $row){
                        $outbox = Outbox::create([
                           'DestinationNumber' => $row['to'],
                           'TextDecoded' => $row['message'],
                           'DeliveryReport' => 'yes'
                        ]);

                        $data = fractal()
                            ->item($outbox)
                            ->transformWith(OutboxTransformer::class)
                            ->serializeWith(DataArraySansIncludeSerializer::class)
                            ->toArray();

                        event(new OutboxEvent($data));
                    }
                }
            }
        } catch (GuzzleException $e) {
            Log::error("Gagal mengirim polling", $e->getTrace());
        }
    }
}

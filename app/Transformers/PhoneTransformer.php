<?php

namespace App\Transformers;

use App\Phones;
use Carbon\Carbon;
use League\Fractal\TransformerAbstract;

class PhoneTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Phones $itemPhone)
    {
        return [
            'id' => $itemPhone->ID,
            'updated_in_db' => $itemPhone->UpdatedInDB,
            'insert_into_db' => $itemPhone->InsertIntoDB,
            'time_out' => $itemPhone->TimeOut,
            'is_time_out' => Carbon::now() > $itemPhone->TimeOut,
            'send' => $itemPhone->Send,
            'receive' => $itemPhone->Receive,
            'imei' => $itemPhone->IMEI,
            'net_code' => $itemPhone->NetCode,
            'net_name' => $itemPhone->NetName,
            'client' => $itemPhone->Client,
            'battery' => $itemPhone->Battery,
            'signal' => $itemPhone->Signal,
            'sent' => $itemPhone->Sent,
            'received' => $itemPhone->Received
        ];
    }
}

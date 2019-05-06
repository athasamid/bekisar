<?php

namespace App\Transformers;

use App\Outbox;
use League\Fractal\TransformerAbstract;

class OutboxTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @param Outbox $itemOutbox
     * @return array
     */
    public function transform(Outbox $itemOutbox)
    {
        return [
            'id' => $itemOutbox->ID,
            'updated_in_db' => $itemOutbox->UpdatedInDB,
            'insert_into_db' => $itemOutbox->InsertIntoDB,
            'sending_date_time' => $itemOutbox->SendingDateTime,
            'send_before' => $itemOutbox->SendBefore,
            'send_after' => $itemOutbox->SendAfter,
            'text' => $itemOutbox->Text,
            'destination_number' => $itemOutbox->DestinationNumber,
            'coding' => $itemOutbox->Coding,
            'udh' => $itemOutbox->UDH,
            'class' => $itemOutbox->Class,
            'text_decoded' => $itemOutbox->TextDecoded,
            'multipart' => $itemOutbox->MultiPart,
            'relative_validity' => $itemOutbox->RelativeValidity,
            'sender_id' => $itemOutbox->SenderID,
            'sending_time_out' => $itemOutbox->SendingTimeOut,
            'delivery_report' => $itemOutbox->DeliveryReport,
            'creator_id' => $itemOutbox->CreatorID,
            'retries' => $itemOutbox->Retries,
            'priority' => $itemOutbox->Priority
        ];
    }
}

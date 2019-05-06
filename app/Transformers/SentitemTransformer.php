<?php

namespace App\Transformers;

use App\SentItems;
use League\Fractal\TransformerAbstract;

class SentitemTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @param SentItems $itemSend
     * @return array
     */
    public function transform(SentItems $itemSend)
    {
        return [
            'id' => $itemSend->ID,
            'updated_in_db' => $itemSend->UpdatedInDB,
            'insert_into_db' => $itemSend->InsertIntoDB,
            'sending_date_time' => $itemSend->SendingDateTime,
            'send_before' => $itemSend->SendBefore,
            'send_after' => $itemSend->SendAfter,
            'text' => $itemSend->Text,
            'destination_number' => $itemSend->DestinationNumber,
            'coding' => $itemSend->Coding,
            'udh' => $itemSend->UDH,
            'class' => $itemSend->Class,
            'text_decoded' => $itemSend->TextDecoded,
            'multipart' => $itemSend->MultiPart,
            'relative_validity' => $itemSend->RelativeValidity,
            'sender_id' => $itemSend->SenderID,
            'sending_time_out' => $itemSend->SendingTimeOut,
            'delivery_report' => $itemSend->DeliveryReport,
            'creator_id' => $itemSend->CreatorID,
            'retries' => $itemSend->Retries,
            'priority' => $itemSend->Priority
        ];
    }
}

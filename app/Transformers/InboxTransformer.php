<?php

namespace App\Transformers;

use App\Inbox;
use League\Fractal\TransformerAbstract;

class InboxTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @param Inbox $itemInbox
     * @return array
     */
    public function transform(Inbox $itemInbox)
    {
        return [
            'id' => $itemInbox->ID,
            'updated_in_db' => $itemInbox->UpdatedInDB,
            'receiving_date_time' => $itemInbox->ReceivingDateTime,
            'text' => $itemInbox->Text,
            'sender_number' => $itemInbox->SenderNumber,
            'coding' => $itemInbox->Coding,
            'udh' => $itemInbox->UDH,
            'smsc_number' => $itemInbox->SMSCNumber,
            'class' => $itemInbox->Class,
            'text_decoded' => $itemInbox->TextDecoded,
            'recipient_id' => $itemInbox->RecipientID,
            'processed' => $itemInbox->Processed
        ];
    }
}

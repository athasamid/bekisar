<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SentItems extends Model
{
    protected $table = 'sentitems';

    protected $fillable = ['UpdatedInDB', 'InsertIntoDB', 'SendingDateTime', 'DeliveryDateTime', 'Text', 'DestinationNumber', 'Coding', 'UDH', 'SMSCNumber', 'Class', 'TextDecoded', 'ID', 'SenderID', 'SequencePosition', 'Status', 'StatusError', 'TPMR', 'RelativeValidity', 'CreatorID'];

    public function scopeFiltered($query, $filter){
        if ($filter)
            $query->whereRaw("CONCAT(Text, '||', DestinationNumber, '||', TextDecoded, '||', RecipientID) LIKE ?", ['%'.$filter.'%']);

        return $query;
    }
}

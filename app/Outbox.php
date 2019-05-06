<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Outbox extends Model
{
    protected $table = 'outbox';

    protected $fillable = ['UpdatedInDB', 'InsertIntoDB', 'SendingDateTime', 'SendBefore', 'SendAfter', 'Text', 'DestinationNumber', 'Coding', 'UDH', 'Class', 'TextDecoded', 'ID', 'MultiPart', 'RelativeValidity', 'SenderID', 'SendingTimeOut', 'DeliveryReport', 'CreatorID', 'Retries', 'Priority'];

    public function scopeFiltered($query, $filter){
        if ($filter)
            $query->whereRaw("CONCAT(Text, '||', DestinationNumber, '||', TextDecoded, '||', RecipientID) LIKE ?", ['%'.$filter.'%']);

        return $query;
    }
}

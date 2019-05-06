<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inbox extends Model
{
    protected $table = 'inbox';

    protected $fillable = ['UpdatedInDB', 'ReceivingDateTime', 'Text', 'SenderNumber', 'Coding', 'UDH', 'SMSCNumber', 'Class', 'TextDecoded', 'ID', 'RecipientID', 'Processed'];

    protected $casts = ['updatedInDB' => 'datetime', 'ReceivingDateTime' => 'datetime', 'Processed' => 'boolean'];


    public function scopeFiltered($query, $filter){
        if ($filter)
            $query->whereRaw("CONCAT(Text, '||', SenderNumber, '||', TextDecoded, '||', RecipientID) LIKE ?", ['%'.$filter.'%']);

        return $query;
    }
}

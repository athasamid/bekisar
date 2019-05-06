<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OutboxMultipart extends Model
{
    protected $table = 'outbox_multipart';

    protected $fillable = ['Text', 'Coding', 'UDH', 'Class', 'TextDecoded', 'ID', 'SequencePosition'];
}

<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password', 'avatar', 'description'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function defaultAddress()
    {
        return $this->addresses()->where('is_default', 1)->with('city')->first();
    }

    public function currentCommand()
    {
        $firstCartItem = $this->cartItems()->first();
        $commandId = $firstCartItem ? $firstCartItem->command_id : null;
        return Command::find($commandId);
    }

    public function deliveryInfo()
    {
        $command = $this->currentCommand();
        $defaultAddress = $this->defaultAddress();

        $address =  $command->address;
        $address_id = null;

        if ($command->delivery_option === 1) {
            $address = $defaultAddress->fullAddress();
            $address_id = $defaultAddress->id;
        }

        return [
            'name' => $defaultAddress->name,
            'phone_number' => $defaultAddress->phone_number,
            'address' => $address,
            'address_id' => $address_id,
        ];
    }

    public function sousCommands()
    {
        return $this->hasMany(SousCommand::class);
    }
}

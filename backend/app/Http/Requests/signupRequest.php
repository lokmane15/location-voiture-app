<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class signupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'num_cin' => 'required',
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'num_tel' => 'required',
            'adresse' => 'required|string',
            'email' => 'required|email|string|unique:users,email'
        ];
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Shoe;  
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request){
        $email = $request->input('email');
        $password = $request->input('password');
        if (!$email || !$password) {
            return new Response('mời bạn nhập email và password đầy đủ',404);
        }
        if ($email && $password) {
            $user = User::where('email', $email)->first();
            if (!$user || !password_verify($password, $user->password)) {
                // Trả về thông báo lỗi
                return new Response('tài khoản hoặc mật khẩu sai',404);
            }
            return new Response('chào mừng '.''.$user->firstname,200);;
        }
    }
    public function register(Request $request){
        $firstname = $request->input('firstname');
        $lastname = $request->input('lastname');
        $email = $request->input('email');
        $password = $request->input('password');
        if (!$email || !$password|| !$firstname|| !$lastname) {
            return new Response('xin hãy nhập đủ trường',404);
        }
        if($email && $password && $firstname && $lastname) {
            if (!preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{6,}$/', $password)) {
                return new Response('password phải lớn hơn 6 chữ số và có 1 chữ cái hoa',404);
            }
            if (User::where('email', $email)->exists()) {
                return new Response('email đã tồn tại',404);
            } else {
                $user = User::create([
                    'firstname' => $firstname,
                    'lastname' => $lastname,
                    'email' => $email,
                    'password' => Hash::make($password),
                ]);
                return new Response( $user->firstname.' đăng kí thành công',200);
            }
            
        }
    }
    public function allshoes() {
        $allshoes = Shoe::all();
        return new Response($allshoes,200);
        
    }
    
}

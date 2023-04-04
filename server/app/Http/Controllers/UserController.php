<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Shoe;
use App\Models\Cart;   
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
            session()->put('user_id', $user->id);
            return new Response($user->firstname,200);;
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
        // Lấy thông tin user_id từ session
        $user_id = session()->get('user_id');
        $allshoes = Shoe::all();
        return response()->json([
            'user_id' => $user_id,
            'shoes' => $allshoes,
        ]);
        
    }
    public function search(Request $request){
        $query = $request->input('query');
        $shoes = Shoe::where('name', 'like', "%$query%")
                             ->orWhere('brand', 'like', "%$query%")
                             ->get();
        // if ($shoes->count() === 0) {
        //  return response()->json(['message' => 'Không có sản phẩm'], 404);
        //         }
        return response()->json($shoes,200);

    }
    public function add(Request $request)
    {
        $user = auth()->user();

        $cartItem = Cart::where('user_id', $user->id)
            ->where('shoe_id', $request->shoe_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->price = $request->price;
            $cartItem->save();
        } else {
            $cartItem = new Cart;
            $cartItem->user_id = $user->id;
            $cartItem->shoe_id = $request->shoe_id;
            $cartItem->quantity = $request->quantity;
            $cartItem->price = $request->price;
            $cartItem->save();
        }

        return redirect()->route('cart.index');
    }

    public function remove($shoe_id)
    {
        $user = auth()->user();

        $cartItem = Cart::where('user_id', $user->id)
            ->where('shoe_id', $shoe_id)
            ->first();

        if ($cartItem) {
            $cartItem->delete();
        }

        return redirect()->route('cart.index');
    }
}

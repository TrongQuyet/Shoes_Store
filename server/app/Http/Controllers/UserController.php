<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Shoe;
use App\Models\Cart;
use App\Models\Orders;
use App\Models\OrderDetail;       
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use BeyondCode\LaravelWebSockets\Facades\WebSocket;

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
            return new Response(json_encode(['user_id' => $user->id, 'firstname' => $user->firstname]), 200);
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
    public function addcart(Request $request)
    {
        $shoe = Shoe::find($request->input('shoe_id'));
        $user_id = $request->input('user_id');
        if(!$user_id){
            return new Response( 'vui lòng đăng nhập trc khi thêm', 404);
        }
        $price = $shoe->price;
        $cart = Cart::where('user_id', $user_id)->where('shoe_id', $shoe->id)->first();
        if ($cart) {
            $cart->quantity += $request->input('quantity');
            $cart->price += $price * $request->input('quantity');
            $cart->save();
        } else {
            $cart = new Cart();
            $cart->user_id = $user_id;
            $cart->shoe_id = $shoe->id;
            $cart->quantity = $request->input('quantity');
            $cart->price = $price * $request->input('quantity');
            $cart->save();
        }
    
        return response()->json(['message' => 'Sản phẩm đã được thêm vào giỏ hàng'], 200);
    }
    public function cartnotification(Request $request){
        $user_id = $request->input('user_id');
        $count = Cart::where('user_id', $user_id)->sum('quantity');
        return new Response( $count, 200);
    }
    public function getcart(Request $request){
        $user_id = $request->input('user_id');
        $cart = Cart::join('shoes', 'carts.shoe_id', '=', 'shoes.id')
                ->where('carts.user_id', $user_id)
                ->select('shoes.id as shoe_id','shoes.name as shoe_name', 'shoes.image as shoe_image', 'carts.quantity', 'carts.price','carts.id')
                ->get();
        return new Response(   $cart, 200);
    }
    public function removeshoe(Request $request){
        $item_id = $request->input('item_id');
        $item = Cart::find($item_id);
        if ($item) {
            $item->delete();
            return new Response("Xóa thành công sản phẩm có ID là $item_id", 200);
        } else {
            return new Response("Không tìm thấy sản phẩm với ID là $item_id", 404);
        }
    }
    public function addorder(Request $request){
        $customer_id = $request->input('customer_id');
        $total_price = $request->input('total_price');
        $customer_name	 = $request->input('customer_name');
        $customer_phone = $request->input('customer_phone');
        $customer_address = $request->input('customer_address');
        $payment_method = $request->input('payment_method');
        $items = $request->input('items');
        if ( !$customer_phone || !$customer_address || !$payment_method) {
            return new Response('điền đầy đủ thông tin giao hàng',404);
        }
        if ( ! $customer_id) {
            return new Response('vui lòng đăng nhập',404);
        }
         // Tạo một đối tượng Order mới
            $order = new Orders;
            $order->customer_id = $customer_id;
            $order->total_price = $total_price;
            $order->customer_name = $customer_name;
            $order->customer_phone = $customer_phone;
            $order->customer_address = $customer_address;
            $order->payment_method = $payment_method;
            $order->save();
     // Tạo các đối tượng OrderDetail mới
            foreach ($items as $item) {
                $orderDetail = new OrderDetail;
                $orderDetail->order_id = $order->id;
                $orderDetail->shoe_id = $item['shoe_id'];
                $orderDetail->quantity = $item['quantity'];
                $orderDetail->price = $item['price'];
                $orderDetail->save();
            }

    // Trả về đối tượng Order vừa tạo
    return response()->json(['message' => 'Order successfully created!']);

    }

 
}

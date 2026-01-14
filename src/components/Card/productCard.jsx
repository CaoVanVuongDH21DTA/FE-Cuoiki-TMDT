import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from "../../store/slices/cartSlice";
import '../../assets/css/cardCss.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // 1. Hàm format tiền VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // 2. Tính giá gốc (để gạch ngang)
  const priceSell = product.price * (1 - product.discount / 100);

  // 3. Xử lý thêm vào giỏ hàng
  const handleAddToCart = (e) => {
    e.preventDefault(); 
    dispatch(addToCart(product));
    alert(`Đã thêm "${product.name}" vào giỏ!`);
  };

  // 4. Kiểm tra hết hàng
  const isOutOfStock = product.stock === 0 || product.status === 'out_of_stock';

  return (
    <div className={`product-card ${isOutOfStock ? 'disabled' : ''}`}>
      {/* Bao quanh bằng Link để bấm vào đâu cũng xem chi tiết được */}
      <Link to={`/product/${product.slug}`} className="product-link">
        
        {/* Phần Ảnh & giảm giá */}
        <div className="product-image-wrapper">
          <img src={product.thumbnail} alt={product.name} loading="lazy" />
          
          {product.discount > 0 && !isOutOfStock && (
            <span className="discount-badge">-{product.discount}%</span>
          )}

          {isOutOfStock && (
            <span className="stock-badge">Hết hàng</span>
          )}
        </div>

        {/* Phần Thông tin */}
        <div className="product-info">
          <span className="product-brand">{product.brand}</span>
          <h3 className="product-name" title={product.name}>
            {product.name}
          </h3>

          <div className="product-price">
            <span className="current-price">{formatPrice(priceSell)}</span>
            {product.discount > 0 && (
              <span className="old-price">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Nút Mua Hàng */}
      <button 
        className="add-to-cart-btn" 
        onClick={handleAddToCart}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Liên hệ' : 'Thêm vào giỏ'}
      </button>
    </div>
  );
};

export default ProductCard;
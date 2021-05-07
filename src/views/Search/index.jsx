import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getShopList } from '../../api/shop'
import style from './index.module.css'

export default function TakeOut() {
  const [keyword, setKeyword] = useState('')
  const [shops, setShops] = useState([])
  const geohash = useSelector(state => state.geohash)
  function handleChange(event) {
    const { value } = event.target
    setKeyword(value)
  }
  function handleSearch() {
    getShopList(geohash, keyword)
      .then(({data}) => setShops(data))
      .catch(err => console.error(err.message))
  }
  return (
    <div className="padding-20 bg-white">
      <div className={`${style.search_wraper} flex`}>
        <input className="flex-auto h-100p" value={keyword} onChange={handleChange}/>
        <button className={`h-100p`} onClick={handleSearch}>提交</button>
      </div>
      <div className="shop_list">
        {
          shops.map(shop => (
            <div className={`${style.shop} flex align-items-start border-bottom`}>
              <img className={style.img} width='40' src={`//elm.cangdu.org/img/${shop.image_path}`}/>
              <div className="content flex-auto">
                <div className="name">{shop.name}</div>
                <div className="sale_number">月售{shop.recent_order_num}单</div>
                <div className="distance">距离{shop.distance}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
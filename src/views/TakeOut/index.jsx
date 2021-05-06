import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import queryString from 'query-string'
import { Carousel } from 'antd-mobile'
import { getPosition } from '../../api/city'
import { getFoodCatList, getShopList } from '../../api/food'
import style from './index.module.css'

function Swiper({cats}) {
  function getLink(cat) {
    return (
      <Link 
        key={cat.id}
        to="/food" 
        className={`flex-column align-items-center w-25p ${style.link}`}>
        <img className={style.img} src={`https://fuss10.elemecdn.com${cat.image_url}`}/>
        <div>{cat.title}</div>
      </Link>
    )
  }
  function add (pre, cat, index) {
    const link = getLink(cat)
    if (index % 8 === 0) {
      return [...pre, (
        <div 
          className={`flex flex-wrap bg-white ${style.padding_vertical}`} 
          key={index}>
            {link}
        </div>
      )]
    }
    const rest = pre.slice(0, -1)
    const last = pre[pre.length -1]
    const {props} = last
    return [
      ...rest,
      {
        ...last,
        props: {
          ...props,
          children: [
            ...(Array.isArray(props.children) 
              ? props.children 
              : [props.children]
            ),
            link
          ]
        }
      }
    ]
  }
  return (
    <Carousel
      autoplay={false}
      infinite
    >
      {
        cats.reduce((pre, value, index) => add(pre, value, index), [])
      }
    </Carousel>
  )
}

export default function TakeOut() {
  const location = useLocation()
  const query = queryString.parse(location.search)
  const geohash = query && query.geohash
  const [postion, setPosition] = useState(null)
  const [cats, setCats] = useState([])
  const [shops, setShops] = useState([])
  useEffect(() => {
    getPosition(geohash)
      .then(({data}) => setPosition(data))
      .catch(err => console.error(err.message))
  }, [geohash])
  useEffect(() => {
    getFoodCatList().then(({data}) => setCats(data)).catch(err=> console.error(err.message))
  }, [])
  useEffect(() => {
    if (postion) {
      const { latitude, longitude } = postion
      getShopList(latitude, longitude)
        .then(({data}) => setShops(data))
        .catch(err => console.error(err.message))
    }
  }, [postion])
  return (
    <div className="flex-column h-100p">
      <div className="title">{postion && postion.name}</div>
      <div className="h-0 flex-auto overflow-auto">
        <Swiper cats={cats}/>
        <div className="divider"/>
        <div className={`bg-white ${style.shop_list} ${style.padding_horizontal}`}>
          <div className={style.title}>附近商家</div>
          {
            shops.map(shop => getShopView(shop))
          }
        </div>
      </div>
    </div>
  )
}


function getShopView(shop) {
  return (
    <div className={`flex border-bottom ${style.padding_vertical}`} key={shop.id}>
      <img src={`//elm.cangdu.org/img/${shop.image_path}`} width={64}/>
      <div className="flex-auto">
        <div className="flex space-between">
          <div className={shop.is_premium ? style.premium : ''}>{shop.name}</div>
          <div className="flex">
            {
              shop.supports && shop.supports.length > 0 
                ? shop.supports.map(support => (<div>{support.name}</div>))
                : null
            }
          </div>
        </div>
        <div className="flex space-between">
          <div>{shop.rating} {shop.recent_order_num}</div>
        </div>
      </div>
    </div>
  )
}
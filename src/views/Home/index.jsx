import { useState } from 'react'
import { Switch, Route, Link, useRouteMatch, useLocation } from 'react-router-dom'
import TakeOut from '../TakeOut'
import Search from '../Search'
import Order from '../Order'
import Mine from '../Mine'
import style from './index.module.css'

const tabs = [{
  key: 'take-out',
  title: '外卖',
  icon: 'icon-elment'
}, {
  key: 'search',
  title: 'search',
  icon: 'icon-search'
}, {
  key: 'order',
  title: '订单',
  icon: 'icon-5'
}, {
  key: 'mine',
  title: '我的',
  icon: 'icon-wodedangxuan'
}]

export default function Home() {
  const {path, url} = useRouteMatch()
  const {pathname} = useLocation()
  const [selected, setSelected] = useState(pathname.replace(path + '/', ''))
  function getTab({key, title, icon}, active) {
    return (
      <Link 
        className={`flex-1 justify-content-center flex-column align-items-center ${active ? style.active : ''}`}
        key={key}
        to={`/home/${key}`}
        onClick={() => setSelected(key)}
      >
        <span className={`iconfont ${icon}`} />
        <span>{title}</span>
      </Link>
    )
  }
  return (
    <div className="flex-column h-100p">
      <div className="header"></div>
      <div className="flex-auto">
        <Switch>
          {/* <IndexRoute component={TakeOut}/> */}
          <Route path={`${path}/take-out`} component={TakeOut}/>
          <Route path={`${path}/search`} component={Search}/>
          <Route path={`${path}/order`} component={Order}/>
          <Route path={`${path}/mine`} component={Mine}/>
        </Switch>
      </div>
      <div className={`flex ${style.tabs}`}>
        {
          tabs.map(tab => getTab(tab, tab.key === selected))
        }
      </div>
    </div>
  )
}

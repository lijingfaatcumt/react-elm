import { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getCityList } from '../../api/city'
import style from './index.module.css'

function CurrentCity (push) {
  const [currentCity, setCurrentCity] = useState(null)
  useEffect(() => {
    getCityList('guess')
      .then(res => {
        setCurrentCity(res.data)
      }).catch(err => {
        console.error(err.message)
      })
  }, [])
  return (
    <Fragment>
      <div className={`flex space-between ${style.padding} ${style.border_bottom}`}>
        <div>当前定位的城市</div>
        <div>定位不准时，请在城市列表中选择</div>
      </div>
      <div className={`flex space-between ${style.padding} ${style.border_bottom}`} onClick={() => push(currentCity)}>
        <div>{currentCity && currentCity.name}</div> 
        {
          currentCity && <div>下一步</div>
        }
      </div>
    </Fragment>
  )
}

function HotCity (push) {
  const [hotCity, setHotCity] = useState(null)
  useEffect(() => {
    getCityList('hot')
      .then(res => {
        setHotCity(res.data)
      }).catch(err => {
        console.error(err.message)
      })
  }, [])
  return (
    <Fragment>
      <div className={style.padding + ' ' +style.border_bottom + ' ' + style.border_top}>热门城市</div>
      <div className="flex flex-wrap m-r-1">
        {
          hotCity && hotCity.map(city => (
            <div 
              key={city.id} 
              onClick={() => push(city)}
              className={`w-25p text-align-center color-blue ${style.padding} ${style.city}`}>
                {city.name}
            </div>
          ))
        }
      </div>
    </Fragment>
  )
}

function AllCity (push) {
  const [allCity, setAllCity] = useState(null)
  useEffect(() => {
    getCityList('group')
      .then(res => {
        const formated = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].reduce((pre, key) => {
          if (key in res.data) {
            pre.push({
              key,
              data: res.data[key]
            })
          }
          return pre
        }, [])
        setAllCity(formated)
      }).catch(err => {
        console.error(err.message)
      })
  }, [])
  function getCities ({key, data}) {
    return (
      <Fragment key={key}>
        <div className={style.divider}/>
        <div className={`${style.padding} ${style.border_bottom}`}>{key} {key === 'A' ? '按字母排序' : ''}</div>
        <div className="flex flex-wrap m-r-1">
          {
            data.map(city => (
              <div 
                key={city.id} 
                onClick={() => push(city)}
                className={`w-25p text-align-center ${style.padding} ${style.city}`}>
                  {city.name}
              </div>
            ))
          }
        </div>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <div className={style.padding + ' ' +style.border_bottom + ' ' + style.border_top}>热门城市</div>
      <div className="m-r-1">
        {
          allCity && allCity.map(data => getCities(data))
        }
      </div>
    </Fragment>
  )
}

export default function City() {
  const history = useHistory()
  function push(city) {
    history.push(`/city/${city.id}`)
  }
  return (
    <Fragment>
      {CurrentCity(push)}
      <div className={style.divider}/>
      {HotCity(push)}
      <div className={style.divider}/>
      {AllCity(push)}
    </Fragment>
  )
}
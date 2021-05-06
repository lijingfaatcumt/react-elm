import { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { getCityDetail, searchPositions } from '../../api/city'
import style from './index.module.css'
import Storage from '../../utils/storage'

function Search({search}) {
  const [keyword, setKeyword] = useState('')
  const initSuggestions = Storage.getItem('suggestions')
  const [suggestions, setSuggestions] = useState(initSuggestions)
  const input = useRef(null)
  useEffect(() => {
    setSuggestions(initSuggestions && initSuggestions.filter(item => item.includes(keyword)))
  }, [keyword])
  function handleChange(event) {
    setKeyword(event.target.value)
  }
  function handleClick(suggestion) {
    setKeyword(suggestion)
    handleSubmit()
    input.current.blur()
  }
  function handleSubmit() {
    if (keyword) {
      search(keyword)
      if (!suggestions || !suggestions.includes(keyword)) {
        const newSuggestions = suggestions != null 
          ? [keyword, ...suggestions] 
          : [keyword]
        Storage.setItem('suggestions', newSuggestions)
      }
    }
  }
  return (
    <div className={style.padding}>
      <div className={`relative ${style.search_container}`}>
        <input 
          ref={input}
          value={keyword}
          onChange={handleChange} 
          className={`${style.margin_bottom_10} ${style.input} w-100p`}/>
          <div className={`${style.suggestions} absolute`}>
            {
              suggestions && suggestions.length > 0
                ? suggestions.map(suggestion => (
                    <div 
                      className={`suggestion ${style.padding}`}
                      onClick={() => handleClick(suggestion)}
                      key={suggestion}>
                        {suggestion}
                    </div>
                  ))
                : null
            }
          </div>
      </div>
      <input 
        type="button" 
        className={`${style.input} ${style.button} w-100p bg-blue`}
        onClick={handleSubmit} 
        value="提交"/>
    </div>
  )
}

export default function CityDetail() {
  const {id} = useParams()
  const [city, setCity] = useState(null)
  const [postions, setPositions] = useState(null)
  const history = useHistory()
  useEffect(() => {
    getCityDetail(id)
      .then(res => {
        console.log(res)
        setCity(res.data)
      }).catch(err => {
        console.error(err.message)
      })
  }, [])
  function handleSubmit(keyword) {
    searchPositions(id, keyword)
      .then(res => {
        setPositions(res.data)
      }).catch(err=> console.error(err.message))
  }
  function handleClick(geohash) {
    history.push(`/home/take-out?geohash=${geohash}`)
  }
  return (
    <div className="flex-column h-100p">
      <div className="title">{city && city.name}</div>
      <div className="h-0 flex-auto overflow-auto">
        <Search search={handleSubmit}/>
        {
          postions && postions.map(({geohash, name, address}) => (
            <div 
              onClick={() => handleClick(geohash)}
              key={geohash} 
              className={`border-top ${style.padding}`}>
              <div className={style.title}>{name}</div>
              <div className={style.content}>{address}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
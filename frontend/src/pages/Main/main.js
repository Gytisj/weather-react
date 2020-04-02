import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap'
import { Flex } from '../../components/shared/Flex/Flex'
import { getCitiesWeatherData } from '../../components/shared/utils/utils'
import { Cards } from '../../components/Card/Card'
import c from './main.module.css'

export const Main = () => {
  const [regionState, setRegionState] = useState('')
  const [regionCapitalState, setRegionCapitalState] = useState([])

  useEffect(() => {
    setRegionCapitalState([])
  }, [regionState])

  const inputChangeHandler = event => {
    setRegionState({
      ...regionState,
      region: event.target.value
    })
  }

  const formSubmitHandler = async event => {
    event.preventDefault()

    const regionData = await fetch(
      `https://restcountries.eu/rest/v2/region/${regionState.region}`
    )
    if (regionData.status === 200) {
      const newRegionData = await regionData.json()
      const resultNotChecked = await getCapitalsData(newRegionData)
      const result = resultNotChecked.filter(city => {
        return city
      })
      result.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
      setRegionCapitalState(...regionCapitalState, result)
    } else {
      alert(
        'please enter a valid region etc. Europe, Asia, Africa, Oceania or Americas'
      )
    }
  }

  const getCapitalsData = newRegionData => {
    const citiesData = newRegionData.map(city => {
      return city.capital
    })
    return getCitiesWeatherData(citiesData)
  }

  return (
    <>
      <div className={c.background}>
        <Flex justify='center' align='center'>
          <form className={c.form}>
            <input type='text' onChange={inputChangeHandler}></input>
            <Button
              className={c.btn}
              type='submit'
              color='warning'
              onClick={formSubmitHandler}
            >
              Search Region
            </Button>
          </form>
        </Flex>
        <Flex justify='center' align='center'>
          <Cards cities={regionCapitalState} component={'main'} />
        </Flex>
      </div>
    </>
  )
}

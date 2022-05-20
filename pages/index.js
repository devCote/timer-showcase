import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { PlayIcon, StopIcon, PauseIcon, MarkIcon } from '../components/icons.js'
import styled from "@emotion/styled"

const Controls = styled.div`&:hover {color: darkgreen}  &:active {color: green}`

const Main = () => {

  const [time, setTime] = useState(0)
  const [timerToggle, setTimerToggle] = useState(false)
  const [savedTime, setSavedTime] = useState([])


  useEffect(() => {
    if (!timerToggle) return clearInterval(timerEvent)
    const timerEvent = setInterval(() => {
      setTime(time++)
    }, 10)
    return () => clearInterval(timerEvent)
  }, [timerToggle])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Timer</title>
      </Head>
      <Box align='center' mt={20} fontSize={24}>
        <Timer time={time} size={32} />
        <Box backgroundColor={'orange.300'} p={2} >
          <Controls as={PlayIcon} cursor={'pointer'} boxSize={10} color={timerToggle && 'darkolivegreen'} onClick={() => setTimerToggle(true)} />
          <Controls as={PauseIcon} cursor={'pointer'} boxSize={10} color={!timerToggle && time > 0 && 'darkolivegreen'} onClick={() => setTimerToggle(false)} />
          <Controls as={StopIcon} cursor={'pointer'} boxSize={10} onClick={() => { setTimerToggle(false); setTime(0); setSavedTime([]) }} />
          <Controls as={MarkIcon} cursor={'pointer'} boxSize={10} onClick={() => { if (time == 0) return; setSavedTime([...savedTime, time]) }} />
        </Box>
        <Box align='center' mt={3} fontSize={24}>
          {savedTime && savedTime.map((val, i) => {
            if (i % 2) return (<Timer time={val} color={'red'} />)
            return <Timer time={val} color={'darkolivegreen'} />
          })}
        </Box>
      </Box>
    </>)
}

export default Main

const Timer = ({ time, size = 26, color = "currentColor" }) => (
  <Text fontSize={size} color={color} fontWeight="semibold">
    {("0" + Math.floor((time / 6000) % 60)).slice(-2)}:
    {("0" + Math.floor((time / 100) % 60)).slice(-2)}:
    {("0" + Math.floor(time % 1000)).slice(-2)}
  </Text>
)

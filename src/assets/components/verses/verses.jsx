// Verses.jsx
import React, { useEffect, useState } from 'react'
import './verses.scss'

const url = 'https://bhagavadgitaapi.in/slok/'

function Verses({ chapterNumber }) {
  console.log(chapterNumber)
  const [verses, setVerses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchVerses = async () => {
    try {
      const res = await fetch(`${url}${chapterNumber}`)
      const data = await res.json()
      setVerses(data)
    } catch (error) {
      setError(error.message || 'An error occurred while fetching verses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVerses()
  }, [chapterNumber, chapterName])

  if (loading) {
    return <p>Loading verses...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h2>Verses for chapter {chapterNumber}</h2>
      <p>{`Chapter Name: ${chapterName}`}</p>
      {verses.map((verse) => {
        return (
          <div className='verse' key={verse._id}>
            <h6>{verse._id}</h6>
            <h6>{verse.slok}</h6>
            <p>{verse.shiva.author}</p>
            <p>{verse.shiva.author.et}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Verses

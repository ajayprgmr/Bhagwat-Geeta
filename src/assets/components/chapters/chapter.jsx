import React, { useState, useEffect } from 'react'
import './chapter.scss'
import Verses from '../verses/verses.jsx'
function Chapter() {
  const [chapters, setChapters] = useState([])
  const [readMore, setReadMore] = useState([])

  const handleVerses = ({ chapterNumber, chapterName }) => {
    return <Verses chapterNumber={chapterNumber} chapterName={chapterName} />
  }

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch('https://bhagavadgitaapi.in/chapters')
        const data = await response.json()
        setChapters(data)
        setReadMore(Array(data.length).fill(false))
      } catch (error) {
        console.log(error)
      }
    }

    fetchChapters()
  }, [])

  return (
    <div className='chapter-container'>
      {chapters.length > 0 ? (
        chapters.map((chapter, index) => {
          return (
            <div
              className='chapter'
              key={chapter.chapter_number}
              onClick={() =>
                // handleVerses({
                //   chapterNumber: chapter.chapter_number,
                //   chapterName: chapter.name,
                // })
                console.log(chapter.chapter_number)
              }
            >
              <h6>{`Chapter : ${chapter.chapter_number}`}</h6>
              <h6>{`${chapter.name} [ ${chapter.transliteration} ]`}</h6>
              <h6>{`Total Verses : ${chapter.verses_count}`}</h6>
              <h6 className='summary'>
                <span>Summar</span>y
              </h6>
              <p>
                {readMore[index]
                  ? chapter.summary.en
                  : `${chapter.summary.en
                      .split(' ')
                      .slice(0, 30)
                      .join(' ')}...`}
                <button
                  className='info-btn'
                  onClick={() => {
                    const newReadMore = [...readMore]
                    newReadMore[index] = !newReadMore[index]
                    setReadMore(newReadMore)
                  }}
                >
                  {readMore[index] ? 'show less' : '  read more'}
                </button>
              </p>
            </div>
          )
        })
      ) : (
        <p className='loading'>Loading...</p>
      )}
    </div>
  )
}

export default Chapter

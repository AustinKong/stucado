import React, { useState } from 'react'
import { generateTimetable, Class } from 'Services/timetable'
import { Day } from 'Types/modules'
import 'Styles/widgets/timetable.css'

const Timetable: React.FC = () => {
  const [timetable, setTimetable] = useState<Class[]>([])
  const [inputUrl, setInputUrl] = useState<string>('')

  const timetableDays: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // TODO: URL validation
  const handleSubmitUrl = (url: string) => {
    setInputUrl('')
    generateTimetable(url).then((timetableResponse: Class[]) => {
      setTimetable(timetableResponse)
      console.log(timetableResponse)
    }).catch(e => console.error(e))
  }

  return <div>
    <h1>Timetable</h1>
    <div className='timetable'>
      <div className='timetable__scrollable'>
        <div className='timetable__header'>
          {
            Array.from({ length: 25 }, (_, index) => index)
              .map((time) => {
                return <time
                  key={time}
                  className='timetable__time'
                >
                  {time.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}00
                </time>
              })
          }
        </div>

        <ul className='timetable__rows'>
          {
            timetableDays.map((day: string) => {
              return <li
                key={day}
                className='timetable__row'
              >
                <div className='timetable__day-of-week'>
                  <span>
                    {day}
                  </span>
                </div>
                <div className='timetable__items'>
                  {
                    timetable
                      .filter((classData) => classData.schedule.day === day)
                      .map((classData, index) => {
                        return <div
                          key={index}
                          className='timetable__item'
                          style={{
                            width: `${1 / 24 * (+classData.schedule.endTime - +classData.schedule.startTime)}%`,
                            left: `${1 / 24 * (+classData.schedule.startTime)}%`
                          }}
                        >
                          <p className='timetable__item-title'>
                            {`${classData.moduleCode} ${classData.classNo}`}
                          </p>
                          <p className='timetable__item-description'>
                            {classData.schedule.startTime} - {classData.schedule.endTime} @ {classData.venue}
                          </p>
                        </div>
                      })
                  }
                </div>
              </li>

            })
          }
        </ul>
      </div>
    </div>
    <input
      type='text'
      placeholder='Paste your NUSMods URL here...'
      value={inputUrl}
      onChange={(e) => setInputUrl(e.target.value)}
    />
    {inputUrl &&
      <button onClick={() => handleSubmitUrl(inputUrl)}>
        Submit URL
      </button>
    }
  </div>
}

export default Timetable
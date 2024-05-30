import { useState } from 'react';
import { DaysOfWeek } from '@shared/constants';

import '@styles/widgets/insights.css';
import { runModel } from '@services/insights';

const DEFAULT_STATE = { timeOfDay: 0, dayOfWeek: DaysOfWeek[0], hoursInClasses: 0, hoursFocused: 0 };

const Insights = () => {
  const [inputs, setInputs] = useState(DEFAULT_STATE);
  const [output, setOutput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputs(DEFAULT_STATE);
    const o = await runModel(inputs);
    setOutput(o);
  };

  const handleChange = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="insights">
      <h2 className="insights-title">
        Insights &nbsp;
        <span className="insights-subtitle">(Demonstration)</span>
      </h2>

      <div className="insights-content">
        <form onSubmit={handleSubmit}>
          <label>
            Input time of day (minutes since midnight):
            <input type="text" name="timeOfDay" value={inputs.timeOfDay || 0} onChange={handleChange} />
          </label>
          <label>
            Input day of week: &nbsp;
            <select value={inputs.dayOfWeek} name="dayOfWeek" onChange={handleChange}>
              {DaysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>
          <label>
            Input hours in classes (today):
            <input type="text" name="hoursInClasses" value={inputs.hoursInClasses || 0} onChange={handleChange} />
          </label>
          <label>
            Input hours focused (today):
            <input type="text" name="hoursFocused" value={inputs.hoursFocused || 0} onChange={handleChange} />
          </label>
          <input className="insights-submit" type="submit" value="Submit" />
        </form>
        <p>Predicted productivity:</p>
        <p className="insights-output">{output || 'Give input'}</p>
      </div>
    </div>
  );
};

export default Insights;

import React, {useEffect, useState} from 'react'


function EditProfieCheckBoxes({handleUpdateInterests}) {
  const [interests, setInterests] = useState([]);

  const handleChecked = ({target:{name}}) => {
    if(interests.includes(name)) {
      const updatedInterests = interests.filter((interest) => interest !== name);
      setInterests(updatedInterests);
      return;
    };
    setInterests([...interests, name]);
  }

  useEffect(()=>{
    if (interests.length <= 0) return;
    handleUpdateInterests(interests);

  },[interests])



  return (
    <div className='edit-profile-interests'>
    <div>
      <label>Night life</label>
      <input onChange={handleChecked} name="Night Life" type="checkbox" />
      <label>Couples trip</label>
      <input onChange={handleChecked} name="Couples Trip" type="checkbox" />
      <label>Tracks</label>
      <input onChange={handleChecked} name="Tracks" type="checkbox" />
    </div>
    <div>
    <label >Vacation</label>
      <input onChange={handleChecked} name="Vacation" type="checkbox" />
      <label >Trip after the army</label>
      <input onChange={handleChecked} name="Trip after the army" type="checkbox" />
      <label >Family trip</label>
      <input onChange={handleChecked} name="Family trip" type="checkbox" />
    </div>
  </div>
  )
}

export default EditProfieCheckBoxes
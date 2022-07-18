import React, { useEffect } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SelectBoxAge from '../SelectBoxAge/SelectBoxAge';
import { useState } from 'react';

import './PartnersFilter.css'
import './PartnersFilterResponsive.css'

function PartnersFilter({setTermFilter}) {
  const [ ages, setAges ] = useState('All')
  const [ partnerWithPlan, setPartnerWithPlan ] = useState(false)

  return (
    <div className="ui menu">
      <div className="item filter-left-side">
        <div className="ui icon input">
          <SelectBoxAge ages={ages} setAges={setAges}/>
        </div>
        <FormControlLabel 
        style={{width: '100%'}}
        control={<Checkbox color="default"  onChange={({ target: { checked } }) => setPartnerWithPlan({ checked })} />} 
        label="Partners with planning" />
      </div>
      <div className="item filter-right-side">
        <button onClick={() => setTermFilter({ages, partnerWithPlan: partnerWithPlan.checked})} className="ui button">Find Partner</button>
      </div>
    </div>
  )
}

export default PartnersFilter
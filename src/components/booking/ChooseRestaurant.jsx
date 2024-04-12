import React, { useState } from 'react'

export const ChooseRestaurant = ({handleEnterBooking, showBooking}) => {

  return (
    <>
    {!showBooking && 
    <div className="choose-button-wrapper">
      <button onClick={handleEnterBooking}>Boka a table</button>
    </div>
    }
    </>
  )
}
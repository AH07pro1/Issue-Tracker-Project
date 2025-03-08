import React, { useState } from 'react'

//OPEN
//IN_PROGRESS
//ClOSED

interface Props {
    status: string
}
function StatusBadge({status}: Props) {
    const [badgeStyle, setBadgeStyle] = useState('')   
    const getBadgeStyle = (status: string) => {
        if(status === 'OPEN') return 'badge badge-success'
        else if(status == 'IN_PROGRESS') return 'badge badge-info'
        else if(status == 'CLOSED') return 'badge badge-error'
        return 'badge badge-primary'
    }
    React.useEffect(() => {
        setBadgeStyle(getBadgeStyle(status))
    }, [status])
  return (
    <div className={badgeStyle}>
       {status}
    </div>
  )
}

export default StatusBadge

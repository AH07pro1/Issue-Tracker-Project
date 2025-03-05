import React from 'react';

interface Props {
    errors: any;
    register: any;
}

function SelectStatusDropdown({ errors, register }: Props) {
    return (
        <div>
            <select
                className={`select select-bordered w-full ${errors.status ? 'select-error' : ''}`}
                {...register('status')}
            >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CLOSED">CLOSED</option>
            </select>
        </div>
    );
}

export default SelectStatusDropdown;

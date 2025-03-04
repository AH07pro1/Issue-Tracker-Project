import React from 'react';

interface Props {
    confirmationMessage: string;
    warningMessage: string;
    cancelAction: () => void;
    deleteAction: () => void;
}

function Modal({ confirmationMessage, warningMessage, cancelAction, deleteAction }: Props) {
    return (
        <div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{confirmationMessage}</h3>
                    <p className="py-4">{warningMessage}</p>
                    <div className="modal-action">
                        <button className="btn" onClick={cancelAction}>Cancel</button>
                        <button className="btn btn-error" onClick={deleteAction}>Delete</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Modal;

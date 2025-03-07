import React from 'react';
import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';
import SelectStatusDropdown from './selectStatusDropdown';
import AssigneeDropdown from '../assigneeDropdown';

interface FormData {
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  assignedToUserId?: number | null;
}

interface IssueFormProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors;
  isLoading: boolean;
  onSubmit: () => void;
  assignedToUserId: string | null;
  setAssignedToUserId: (id: string | null) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({
  register,
  errors,
  isLoading,
  onSubmit,
  assignedToUserId,
  setAssignedToUserId,
}) => (
  <div className="max-w-lg mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-6 text-primary">New Issue</h1>
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Issue title"
        className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
        {...register('title')}
      />
      {errors.title && (
        <span className="text-error text-sm">{typeof errors.title.message === 'string' ? errors.title.message : 'Title is required'}</span>
      )}

      <textarea
        placeholder="Issue description"
        rows={3}
        className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
        {...register('description')}
      />
      {errors.description && (
        <span className="text-error text-sm">{typeof errors.description.message === 'string' ? errors.description.message : 'Description is required'}</span>
      )}

      {/* Dropdown for status */}
      <SelectStatusDropdown errors={errors} register={register} />
      {errors.status && (
        <span className="text-error text-sm">{typeof errors.status.message === 'string' ? errors.status.message : 'Invalid status'}</span>
      )}

      {/* Assignee dropdown */}
      <AssigneeDropdown onSelectUser={setAssignedToUserId} />

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          'Submit Issue'
        )}
      </button>
    </form>
  </div>
);

export default IssueForm;

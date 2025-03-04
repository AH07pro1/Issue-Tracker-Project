import {z} from 'zod';

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  status: z.string().min(1).max(20),
  description: z.string().min(1)
})

export default createIssueSchema;
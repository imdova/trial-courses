# Assignment API Integration Summary

## Overview
This document summarizes the integration of the Assignment API with the correct request/response format.

## API Endpoints

### 1. Create Assignment
**Endpoint:** `POST /api/assignments`

**Request Body:**
```json
{
  "name": "Research Paper on Climate Change",
  "start_date": "2025-08-01T09:00:00Z",
  "end_date": "2025-08-31T23:59:59Z",
  "instructions": "Write a 10-page research paper on climate change impacts.",
  "attachment_url": "https://s3.aws.com/uploads/assignment.pdf",
  "totalPoints": 100,
  "numberOfQuestions": 10
}
```

### 2. Update Assignment
**Endpoint:** `PATCH /api/assignments/:id`

**Request Body:**
```json
{
  "name": "Research Paper on Climate Change",
  "start_date": "2025-08-01T09:00:00Z",
  "end_date": "2025-08-31T23:59:59Z",
  "instructions": "Write a 10-page research paper on climate change impacts.",
  "attachment_url": "https://s3.aws.com/uploads/assignment.pdf",
  "totalPoints": 100,
  "numberOfQuestions": 10
}
```

### 3. Get Assignments
**Endpoint:** `GET /api/assignments`

**Response:**
```json
{
  "data": [
    {
      "id": "412a1551-8479-4b0e-99b9-966dc8a717c0",
      "created_at": "2025-09-25T16:02:14.191Z",
      "updated_at": "2025-09-25T16:02:14.191Z",
      "deleted_at": null,
      "name": "Research Paper on Climate Change",
      "start_date": "2025-08-01T09:00:00Z",
      "end_date": "2025-08-31T23:59:59Z",
      "instructions": "<p>Write a 10-page research paper</p>",
      "attachment_url": "uploaded_file_1758816134417.pdf",
      "totalPoints": 100,
      "numberOfQuestions": 10,
      "createdBy": "f417b5fa-8806-42ba-bece-77416a37ef7d",
      "academy": null,
      "submissions": []
    }
  ],
  "meta": {
    "itemsPerPage": 20,
    "totalItems": 4,
    "currentPage": 1,
    "totalPages": 1,
    "sortBy": [["created_at", "DESC"]]
  },
  "links": {
    "current": "http://medicova-courses-backend.vercel.app/api/assignments?page=1&limit=20&sortBy=created_at:DESC"
  }
}
```

## Code Changes

### 1. Updated Type Definitions

**File:** `types/courses.ts`
```typescript
export interface Assignment {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  start_date: string | null;
  end_date: string | null;
  instructions: string;
  attachment_url: string;
  totalPoints: number;
  numberOfQuestions: number;
  createdBy: string;
  academy: string | null;
  submissions: unknown[];
}
```

### 2. Updated Redux Slice

**File:** `store/slices/assignmentsSlice.ts`

**CreateAssignmentPayload:**
```typescript
export interface CreateAssignmentPayload {
  name: string;
  instructions: string;
  start_date: string; // ISO 8601 format
  end_date: string; // ISO 8601 format
  totalPoints: number;
  numberOfQuestions: number;
  attachment_url: string;
}
```

**UpdateAssignmentPayload:**
```typescript
export interface UpdateAssignmentPayload {
  id: string;
  name?: string;
  start_date?: string; // ISO 8601 format
  end_date?: string; // ISO 8601 format
  instructions?: string;
  attachment_url?: string;
  totalPoints?: number;
  numberOfQuestions?: number;
}
```

**API Response Interface:**
```typescript
interface AssignmentApiResponse {
  data: Assignment[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [[string, string]];
  };
  links: {
    current: string;
  };
}
```

### 3. Updated Form Modals

**AssignmentFormModal.tsx** - Create Assignment
- Changed field names: `points` → `totalPoints`, `questions` → `numberOfQuestions`
- Converts form dates to ISO 8601 format before sending to API
- Properly formats the request payload

**EditAssignmentModal.tsx** - Update Assignment
- Changed field names: `points` → `totalPoints`, `questions` → `numberOfQuestions`
- Converts form dates to ISO 8601 format
- Parses ISO date strings back to Date objects for form default values

### 4. Updated Table Columns

**File:** `components/columns/assignmentColumns.tsx`
- Uses correct field names from API response
- Displays `totalPoints` and `numberOfQuestions`
- Properly formats dates with overdue detection
- Shows submission count from `submissions` array

### 5. Updated UI Components

**AdvancedDataTable Integration:**
- Replaced DynamicTable with AdvancedDataTable
- Added row selection with checkboxes
- Global search functionality
- Export to CSV, Excel, JSON
- Column visibility management
- Pagination support
- Sorting capabilities

## Key Features

✅ **Proper Date Handling**
- Dates are stored as ISO 8601 strings in the database
- Converted to Date objects for form inputs
- Converted back to ISO strings for API requests

✅ **Correct Field Names**
- `totalPoints` instead of `points`
- `numberOfQuestions` instead of `questions`
- `name` instead of `title`

✅ **File Upload Placeholder**
- TODO: Replace with actual S3/file upload implementation
- Currently generates dummy filenames

✅ **API Response Handling**
- Properly extracts data from nested `data` array
- Handles pagination metadata from `meta` object
- Error handling with user feedback

## Next Steps / TODOs

1. **File Upload Integration**
   - Replace dummy file upload with actual S3 upload
   - Update `attachment_url` with real uploaded file URL

2. **Error Handling**
   - Add toast notifications for success/error states
   - Better error messages to users

3. **Delete Functionality**
   - Implement the delete handler in AssignmentsTable
   - Add confirmation modal

4. **Archive Functionality**
   - Implement archive API endpoint handler
   - Update UI to show archived assignments

5. **Reminder Functionality**
   - Implement send reminder API endpoint
   - Add email/notification integration

## Testing Checklist

- [ ] Create assignment with all fields
- [ ] Create assignment with minimal fields
- [ ] Update assignment
- [ ] View assignment list
- [ ] Search assignments
- [ ] Sort by different columns
- [ ] Export assignments (CSV, Excel, JSON)
- [ ] Pagination navigation
- [ ] Column visibility toggling
- [ ] Row selection
- [ ] Edit action
- [ ] Delete action (when implemented)
- [ ] Archive action (when implemented)
- [ ] Date validation (start_date < end_date)
- [ ] File upload (when implemented)


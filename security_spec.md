# Security Specification - Little Affair Sariska Blog

## Data Invariants
1. A blog post must have a unique slug.
2. Only authorized admins can create, update, or delete blog posts.
3. Anyone can read 'published' blog posts.
4. Anyone can read and create comments on published blog posts.
5. Comments cannot be modified or deleted by users once posted (only admin can manage them if needed, but for now, we'll keep it simple).

## The "Dirty Dozen" Payloads

### Identity Spoofing
1. **P1 (Blog Create - Not Admin)**: Attempting to create a blog post as a non-admin user.
2. **P2 (Blog Create - Wrong authorId)**: Attempting to create a blog post with an `authorId` that doesn't match the authenticated user.

### Integrity Violations
3. **P3 (Blog Create - Missing Fields)**: Attempting to create a blog post without the required `slug` or `status`.
4. **P4 (Blog Create - Invalid Slug)**: Attempting to create a blog post with a slug containing uppercase letters or spaces (e.g., "My Post").
5. **P5 (Blog Create - Content too long)**: Attempting to create a blog post with content exceeding 50,000 characters.
6. **P6 (Comment Create - Empty Content)**: Attempting to create a comment with empty string content.
7. **P7 (Comment Create - Orphaned Comment)**: Attempting to create a comment on a blog post that is still a 'draft'.

### State Shortcutting & Unauthorized Access
8. **P8 (Blog Update - Change createdAt)**: Attempting to modify the `createdAt` timestamp of an existing blog post.
9. **P9 (Blog Update - Non-Admin)**: Attempting to change the status of a blog from 'draft' to 'published' as a non-admin.
10. **P10 (Blog Read - Draft Post)**: Attempting to read a blog post where `status == 'draft'` as a non-admin.
11. **P11 (Comment Create - Massive Content)**: Attempting to post a comment with 10,000 characters (max is 1,000).
12. **P12 (Blog Delete - Non-Admin)**: Attempting to delete a blog post as a non-admin.

## Test Runner (Logic Verification)
The `firestore.rules` will be verified against these scenarios using `isValidBlog()` and `isValidComment()` helpers.
Admin status will be checked against the hardcoded email: `nayanasdf1234@gmail.com`.

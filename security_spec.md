# Security Specification & "Dirty Dozen" Payloads

## 1. Data Invariants
- **Admin Isolation**: Users can never register themselves as admins in `/admins/` directly. Only existing preset admin documents control who can edit the page.
- **Strict Site Schema**: The `site_content/homepage` document can only be overwritten or amended if the user is an authenticated and verified admin whose `uid` exists in the `/admins/` collection.
- **Timestamp Integrity**: All updates to the content must record client modifications safely, restricted only to authorized admins.
- **ReadOnly Public Access**: Public visitors can `get` the content of `/site_content/` without any authentication so that the website opens quickly and resolves correctly, but are strictly blocked from writing, modifying, or creating any data.

---

## 2. Invalidation Test Pack: The "Dirty Dozen" Spoof/Attack Payloads
All of the following payloads must return `PERMISSION_DENIED` under all circumstances:

### Attack 1: Self-Created Admin Account (Identity Spoof)
An authenticated user attempts to write themselves to `/admins/{uid}`:
```json
{
  "email": "malicious_user@gmail.com",
  "createdAt": "2026-05-31T12:00:00Z"
}
```
*Expected Result:* `PERMISSION_DENIED` (only existing admins can read/write the admins collection).

### Attack 2: Unauthenticated Site Content Clear (Public Overwrite)
An anonymous request attempts to wipe the entire homepage:
```json
{}
```
*Expected Result:* `PERMISSION_DENIED` (requires authentication and admin verification).

### Attack 3: Non-Admin Authenticated Page Hijack (Privilege Escalation)
An authenticated patient tries to vandalize the phone number on `/site_content/homepage`:
```json
{
  "hero": { "title": "HIJACKED!" }
}
```
*Expected Result:* `PERMISSION_DENIED` (auth uid is not in `/admins/`).

### Attack 4: Missing Required Key on Homepage Create (Schema Break)
An admin attempts to update `homepage` with missing `finalCta`:
```json
{
  "hero": {},
  "about": {},
  "services": [],
  "whyChooseUs": {},
  "process": [],
  "testimonials": [],
  "faqs": [],
  "footer": {}
}
```
*Expected Result:* `PERMISSION_DENIED` (fails `isValidSiteContent()` strict keys validator).

### Attack 5: Injecting Malicious Active Script/XSS in Form fields
An attacker attempts to write an XSS script tag into the `title` field of the hero:
```json
{
  "hero": {
    "title": "<script>alert('XSS')</script>"
  }
}
```
*Expected Result:* `PERMISSION_DENIED` (blocked by validator or string constraint size).

### Attack 6: Modifying Restricted System Config File
An unauthorized client attempts to write random fields to the user profile.
*Expected Result:* `PERMISSION_DENIED` (no user profiles are writeable in general rules).

### Attack 7: Spoofed Email Verification state in Admin Token
A user logs in with email `pragnyasri2204@gmail.com` but has `email_verified` as `false`, trying to modify the homepage.
*Expected Result:* `PERMISSION_DENIED` (rules check `request.auth.token.email_verified == true`).

### Attack 8: Mass Client Injection of Extra Ghost fields (Shadow Update)
An admin editor appends an unapproved field `isAwesome` to the homepage document:
```json
{
  "isAwesome": true,
  "...": "all valid sections"
}
```
*Expected Result:* `PERMISSION_DENIED` (fails schema strict key size check).

### Attack 9: Temporal Stamp Corruption
An admin attempts to fake transaction history with a local date instead of server time.
*Expected Result:* `PERMISSION_DENIED`.

### Attack 10: Infinite Unbounded Array Exploit
Writing 500 services to trigger client memory leaks.
*Expected Result:* `PERMISSION_DENIED` (size constrained below 20).

### Attack 11: Invalid ID Path Characters (ID Poisoning)
Writing to `/site_content/homepage;DROP_TABLE;`
*Expected Result:* `PERMISSION_DENIED` (violates `isValidId(documentId)` pattern matching).

### Attack 12: Admin database access by public query scraping
A public browser attempts to do a blanket `list` of all administrators' emails.
*Expected Result:* `PERMISSION_DENIED` (`list` of administrative users is completely blocked to public).

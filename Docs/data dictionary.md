Patients/Clients Table

patient_id (PK): UUID
first_name: Text
last_name: Text
email: Text (unique)
phone: Text
date_of_birth: Date
address: Text
city: Text
state: Text
zip_code: Text
emergency_contact_name: Text
emergency_contact_phone: Text
insurance_provider: Text
insurance_id: Text
created_at: Timestamp
updated_at: Timestamp
is_active: Boolean

Caregivers Table

caregiver_id (PK): UUID
first_name: Text
last_name: Text
email: Text (unique)
phone: Text
relationship_to_patient: Text
created_at: Timestamp
updated_at: Timestamp
is_active: Boolean

Patient_Caregiver_Relation Table

relation_id (PK): UUID
patient_id (FK): UUID (references Patients)
caregiver_id (FK): UUID (references Caregivers)
is_primary: Boolean
created_at: Timestamp
updated_at: Timestamp

Therapists Table

therapist_id (PK): UUID
first_name: Text
last_name: Text
email: Text (unique)
phone: Text
specialization: Text
license_number: Text
years_of_experience: Integer
bio: Text
profile_image_url: Text
consultation_fee: Decimal
availability_schedule: JSON (or separate table)
created_at: Timestamp
updated_at: Timestamp
is_active: Boolean

Hospitals/Clinics Table

hospital_id (PK): UUID
name: Text
address: Text
city: Text
state: Text
zip_code: Text
phone: Text
email: Text
website: Text
operating_hours: JSON
created_at: Timestamp
updated_at: Timestamp
is_active: Boolean

Hospital_Therapist_Relation Table

relation_id (PK): UUID
hospital_id (FK): UUID (references Hospitals)
therapist_id (FK): UUID (references Therapists)
created_at: Timestamp
updated_at: Timestamp

Disorders Table

disorder_id (PK): UUID
name: Text
description: Text
symptoms: Array (or reference to symptoms)
severity_scale: JSON
created_at: Timestamp
updated_at: Timestamp

Symptoms Table

symptom_id (PK): UUID
name: Text
description: Text
created_at: Timestamp
updated_at: Timestamp

Disorder_Symptom_Relation Table

relation_id (PK): UUID
disorder_id (FK): UUID (references Disorders)
symptom_id (FK): UUID (references Symptoms)
weight: Integer (how strongly this symptom indicates this disorder)
created_at: Timestamp
updated_at: Timestamp

Survey Table

survey_id (PK): UUID
title: Text
description: Text
questions: JSON (or separate Questions table)
created_at: Timestamp
updated_at: Timestamp
is_active: Boolean

Patient_Survey_Response Table

response_id (PK): UUID
patient_id (FK): UUID (references Patients)
survey_id (FK): UUID (references Survey)
responses: JSON
score: Integer
created_at: Timestamp

Patient_Disorder_Diagnosis Table

diagnosis_id (PK): UUID
patient_id (FK): UUID (references Patients)
disorder_id (FK): UUID (references Disorders)
diagnosis_date: Date
severity: Integer
diagnosed_by (FK): UUID (references Therapists)
notes: Text
created_at: Timestamp
updated_at: Timestamp

Appointments Table

appointment_id (PK): UUID
patient_id (FK): UUID (references Patients)
therapist_id (FK): UUID (references Therapists)
hospital_id (FK): UUID (references Hospitals, null for virtual appointments)
booked_by (FK): UUID (could reference either Patients or Caregivers)
booked_by_type: Enum ('patient', 'caregiver')
appointment_date: Date
start_time: Time
end_time: Time
type: Enum ('virtual', 'in-person')
status: Enum ('scheduled', 'completed', 'cancelled', 'no-show')
meeting_link: Text (for virtual appointments)
notes: Text
created_at: Timestamp
updated_at: Timestamp

Session_Notes Table

note_id (PK): UUID
appointment_id (FK): UUID (references Appointments)
content: Text
created_by (FK): UUID (references Therapists)
created_at: Timestamp
updated_at: Timestamp
is_private: Boolean

Authentication Table

auth_id (PK): UUID
user_id: UUID (could be patient_id, caregiver_id, or therapist_id)
user_type: Enum ('patient', 'caregiver', 'therapist', 'admin')
email: Text (unique)
password_hash: Text
last_login: Timestamp
created_at: Timestamp
updated_at: Timestamp
is_active: Boolean
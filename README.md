# E-Governance-Service-Portal
The project is made to solve the issue of getting a change done in government documents and perform it faster. The project is built using ReactJS, MongoDB, OAuth 2.0 and Django.



**Production Blueprint & Complete System Documentation**
This project is an enterprise-grade, full-stack E-Governance platform designed to bridge the digital divide between citizens and public administrative authorities. Built on a completely decoupled, stateless architecture, the platform streamlines the deployment and processing of public service workflows (such as issuing birth certificates, driving licenses, or land registrations).
Citizens can digitally submit service requests with multi-part supporting documentation, track processing lifecycles, and view live status feeds. Simultaneously, verifying government officers and system administrators use stateful, dedicated panels to audit records, pin textual remarks, mutate status lifecycles, and manage user permissions.



**Architecture**
•	• Decoupled Architecture: Features a high-performance Python-based RESTful API service mesh feeding structured data dynamically to a responsive Single-Page Application (SPA) client written in React and compiled using Vite.
•	• Granular Role-Based Access Control (RBAC): Restricts interface layout sections, API routing controllers, and field write capabilities based on three platform permissions:
    - Citizen: Initiates service requests via multi-part payloads, views reverse-chronological personal application arrays, and clears unread alerts.
    - Officer: Monitors global processing queues, logs administrative auditing feedback, and signs off on terminal state transitions.
    - Admin: Observes structural metrics overview grids, evaluates total platform engagement indicators, and mutates user access roles on-the-fly.
•	• Automated Asynchronous Messaging Signals: Powered by Django database lifecycle hooks (post_save). When an auditing officer transitions a service file to a terminal status (approved or rejected), the system atomically dispatches an internal notification entity and a transactional validation email via SMTP.
•	• Stateless Multi-OAuth 2.0 Core: Implements a security layer that features standard username/password authentication alongside Google OAuth 2.0 Identity Mapping. Upon successful social sign-in verification, the backend automatically structures rotating SimpleJWT credentials.
•	• NoSQL Persistence Adapter: Replaces traditional, rigid tables with a document-oriented MongoDB infrastructure layer. Seamless integration is handled through the djongo compiler engine to ensure schema flexibility.



**API Endpoint Reference Matrix**
All secured backend endpoints demand a valid stateless authorization header signature:
Format: Authorization: Bearer <your_jwt_access_token>



**Service Applications Core Subsystem (/api/applications/)**
Method	Absolute Path	Guard Constraints	Purpose / Data Flow
POST	/api/applications/	Citizen	Accepts multipart forms to link text files and upload physical attachments (FileField).
GET	/api/applications/mine/	Citizen	Pulls records generated explicitly by the executing token bearer, ordered by created_at.
GET	/api/applications/all/	Officer / Admin	System-wide master ledger lookup. Supports state queries (e.g. /all/?status=pending).
GET	/api/applications/<id>/	Related Parties	Extracts detailed schema files, assigned reviewer references, and document URLs.
PATCH	/api/applications/<id>/	Officer / Admin	Implements partial evaluation writes via ApplicationUpdateSerializer, locking edits strictly to status and remark.



**Cross-Channel Notification Hub (/api/notifications/)**
Method	Absolute Path	Guard Constraints	Purpose / Data Flow
GET	/api/notifications/	Owner Only	Populates live layout components with chronological application updates.
POST	/api/notifications/<id>/read/	Owner Only	Executes partial database field writes to toggle targets from unread to read.



**Frontend Component Lifecycle & Routing**
1. Login.jsx (Single Sign-On Entry):  Integrates a full window layout redirect wrapper targeting the backend's Google callback framework, backed by a responsive sandbox selector to facilitate development staging profiles locally.
2. App.jsx (Token Guard & Cleaner):  Listens to parameters incoming from social auth callbacks, stores token strings inside local states, queries the verification endpoint, and sanitizes browser pathways immediately via window.history.replaceState.
3. ServiceForm.jsx (Multipart Stream Handler):  Controls document selection inputs. It packages user fields into standard FormData arrays to support physical validation attachments (PDFs/Images) through specialized multi-part serializers.
4. OfficerPanel.jsx (Auditing Workspace):  Iterates over the global processing queue. Officers type specialized remark logs directly into text areas mapped to specific entries, pushing decisions to the backend with interactive approve/reject handlers.
5. AdminPanel.jsx (Platform Metrics Dashboard):  Organizes user analytics panels displaying total processing traffic while running structured tabular rows that feed immediate data role changes back to the database user engine.



**Local Deployment & System Set Up**
1. Backend Architecture Configuration
Navigate to your target working directory in your terminal and execute the following commands:
git clone https://github.com/Japesh18/E-Governance-Service-Portal.git
cd E-Governance-Service-Portal

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install django djangorestframework djongo rest_framework_simplejwt social-auth-app-django django-cors-headers

Create a consolidated environment configurations file named .env in the root folder and configure your local values:
DJANGO_SECRET_KEY=your-high-entropy-unique-production-secret-string
DEBUG=True
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=egovern_db
GOOGLE_CLIENT_ID=your-apps-google-oauth-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-apps-google-oauth-client-secret
DEFAULT_FROM_EMAIL=noreply@nationserve.in

Synchronize your collections schema mapping layout patterns and start your core engine:
python manage.py migrate
python manage.py runserver

2. Frontend Client Application Configuration
Open a secondary detached terminal path and run the following deployment routines:
cd frontend
npm install
npm run dev

**Security & Data Integrity Specifications**
• Split-Context Data Contracts:The workspace strictly isolates application view rights from evaluation updating privileges. The officer-facing application serializer acts as an immutable layer that ignores any incoming mutations to fields like user description, file path, or owner details. This protects submitted documents against unauthorized changes during review.
• Stateless Token Isolation:Password hashes and social credential handshakes are isolated directly inside the server layer. The client UI layer interacts exclusively via decoupled, short-lived stateless JWT arrays, preventing session hijacking vectors and removing exposed data footprints on user local filesystems.

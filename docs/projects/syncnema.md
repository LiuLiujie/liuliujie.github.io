---
tag:
- Springboot
- Kubernetes
- Microservice
category: Computer Science
---
# Syncnema (SoA Course Project)
Syncnema is a project for Service-oriented Architecture Course, developed by me and another teammate.



## What is Syncnema

- Syncnema is a platform for watching movies together.
- During the screening session, all playback controls (play, pause, seek) will be synchronized across the participants.
- Similar to real-world services such as Teleparty and GroupWatch on
Disney+.



## Requirement analysis

Users can search and purchase movies. After purchasing movies, a user can invite other users to watch movies together using their own devices. During the screening session, all playback controls (play, pause, seek) will be synchronized across the participants, imitating the experience of watching movies together. These ideas are not final and are open for improvements in the future.

### Target Users

- Visitor: Browse introduction and movies’ information.
- Registered User: Buy movies, send invitation, and watch movies.
- Invited User: Watch movies through with invitation.
- Admin: Upload & remove movies and movies’ information.

### Core Features

1. Browse a list of movies and view their details

2. Create a screening session to watch a movie

3. Invite friends to join the screening session

4. Synchronize playback controls across the audiences in the screening session



## Services breakdown

We mapped the features to the corresponding services.

![Screenshot 2023-11-08 at 23.09.30](https://pics.yujieliu.com/blog/2023/11/af1a478bb761096f89a238629b73a189.png)

| Service                | Functionality                                                |
| ---------------------- | ------------------------------------------------------------ |
| Watch Service          | This service handles the main functionality of playback synchronization. |
| User Data Service      | This service handles functionalities related to user data.   |
| Security Service       | This service is used to issue token for the logged-in user, manage the token validity, handle logout and update user’s credential. |
| Movie Data Service     | This service handles functionalities related to movie data, like movie retrievals and updates, and the metadata |
| Object Storage Service | This service handles how the movies are stored as static objects, and also offer URLs to access the movies. |
| Order Service          | This service serves ordering requests from users who want to purchase movies. |
| Notification Service   | This service handles notification channels and messaging, for example when a user sends an invitation to another user. |
| Admin Service          | This service handles administrative operations in Syncnema, such as uploading movies, editing movie information, and changing availability status of movies. |



## Architecture

### Overall architecture

![image-20231108230804599](https://pics.yujieliu.com/blog/2023/11/647f6fdf5f8488fd503a620ee2572c46.png)

### Services Interactions

![image-20231108231827984](https://pics.yujieliu.com/blog/2023/11/cb7701504aa10d8451b8f3b0ef21b2bf.png)

- **Green arrows** show how the front-end of Watch Service communicates with other services, which is working as the role of the conductor in an orchestration architecture.
- **Red arrows** are internal REST requests send from one service to another one.
- **Yellow arrows** are APIs for administrator to maintain the movies and related data.

### API Documentation (`API.md`)

## Endpoints

## Create a New Blog Post:
- Open Postman.
- Set the method to POST.
- Enter the URL http://localhost:3000/posts.
- Go to the Body tab, select raw and JSON.
- Enter the JSON payload for the new blog post.

{
  "title": "Eight Blog Post",
  "content": "This is the content of the eight blog post.",
  "author": "Alden"
}

- Click Send.

## Get All Blog Posts:
- Open Postman.
- Set the method to GET.
- Enter the URL http://localhost:3000/posts.
- Click Send.

## Get a Single Blog Post by ID:
- Open Postman.
- Set the method to GET.
- Enter the URL http://localhost:3000/posts/1.
- Click Send.

## Update a Blog Post by ID:
- Open Postman.
- Set the method to PUT.
- Enter the URL http://localhost:3000/posts/1.
- Go to the Body tab, select raw and JSON.
- Enter the JSON payload for the updated blog post.
- Click Send.

## Delete a Blog Post by ID:
- Open Postman.
- Set the method to DELETE.
- Enter the URL http://localhost:3000/posts/1.
- Click Send.
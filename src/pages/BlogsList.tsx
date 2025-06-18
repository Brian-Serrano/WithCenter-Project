import { useEffect } from 'react'
import '../css/BlogsList.css'
import '../css/Spinner.css'
import supabase from '../client/supabase-client'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../state/store'
import { onError, onSuccess } from '../state/blogs-list-slice'
import { useNavigate } from 'react-router-dom'
import NavigationBar from './NavigationBar'

function BlogsList() {
    const blogsList = useSelector((state: RootState) => state.blogsList)
    const dispatch = useDispatch<AppDispatch>()
    const currentUser = localStorage.getItem("user_id")
    const onNavigate = useNavigate()

    const getBlogs = async () => {
        const { data, error } = await supabase.from("Blog").select("id, title, description, created_at, user_id, User (username)")

        if (error) {
            return dispatch(onError(error.message))
        }
        else {
            return dispatch(onSuccess(data.map(d => {
                return {
                    id: d.id,
                    title: d.title,
                    description: d.description,
                    created_at: new Date(d.created_at).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    }),
                    created_by: d.User.username,
                    is_editable: d.user_id == currentUser,
                    user_id: d.user_id
                }
            })))
        }
    }

    useEffect(() => {
        getBlogs()
    }, [])

    const getProcess = () => {
        switch(blogsList.processState) {
            case "loading":
                return <div className="spinner"></div>
            case "failed":
                return <p>{blogsList.error}</p>
            case "success":
                return (
                    <section className="card-container">
                        {blogsList.data.map((blog) => {
                            return (
                                <div key={blog.id}>
                                    <div className="card">
                                        <div className="card-title">{blog.title}</div>
                                        <div className="card-description">{blog.description}</div>
                                        <div className="card-meta">
                                            <span>{blog.created_at}</span>
                                            <span>{blog.created_by}</span>
                                        </div>
                                        {blog.is_editable ? <button type="button" onClick={() => onNavigate(`/update-blog/${blog.id}/${blog.user_id}`)}>Edit</button> : <div></div>}
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                )
        }
    }


    return (
        <div>
            <NavigationBar />
            <header>
                <h1>Blogs</h1>
            </header>

            {getProcess()}
        </div>
    )
}

export default BlogsList
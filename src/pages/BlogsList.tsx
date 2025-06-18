import { useEffect } from 'react'
import styles from '../css/BlogsList.module.css'
import '../css/Spinner.css'
import supabase from '../client/supabase-client'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../state/store'
import { decrementPage, incrementPage, onError, onSuccess } from '../state/blogs-list-slice'
import { useNavigate } from 'react-router-dom'
import NavigationBar from './NavigationBar'

function BlogsList() {
    const blogsList = useSelector((state: RootState) => state.blogsList)
    const dispatch = useDispatch<AppDispatch>()
    const currentUser = localStorage.getItem("user_id")
    const onNavigate = useNavigate()

    const getBlogs = async () => {
        const from = (blogsList.pageNumber - 1) * 6
        const to = from + 6 - 1

        console.log(from + " - " + to)

        const { data, count, error } = await supabase
            .from("Blog")
            .select("id, title, description, created_at, user_id, User (username)", { count: "exact" })
            .order("created_at", { ascending: false })
            .range(from, to)

        console.log(count)

        if (error) {
            return dispatch(onError(error.message))
        }
        else {
            return dispatch(onSuccess({blogs: data.map(d => {
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
            }), count: count || 0}))
        }
    }

    useEffect(() => {
        getBlogs()
    }, [blogsList.pageNumber])

    const getProcess = () => {
        switch(blogsList.processState) {
            case "loading":
                return <div className="spinner"></div>
            case "failed":
                return <p>{blogsList.error}</p>
            case "success":
                return (
                    <div>
                        <section className={styles.card_container}>
                            {blogsList.data.map((blog) => {
                                return (
                                    <div key={blog.id}>
                                        <div className={styles.card}>
                                            <div className={styles.card_title}>{blog.title}</div>
                                            <div className={styles.card_description}>{blog.description}</div>
                                            <div className={styles.card_meta}>
                                                <span className={styles.span}>{blog.created_at}</span>
                                                <span className={styles.span}>{blog.created_by}</span>
                                            </div>
                                            {blog.is_editable ? <button
                                                type="button"
                                                className={styles.button}
                                                onClick={() => onNavigate(`/update-blog/${blog.id}/${blog.user_id}`)}>Edit</button> : <div></div>}
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                        <div className={styles.link_body}>
                            <div className={styles.link_container}>
                                <p style={{color: "blue"}} className={styles.a} onClick={() => {
                                    dispatch(decrementPage())
                                }}>Previous</p>
                                <p style={{color: "blue"}} className={styles.a} onClick={() => {
                                    dispatch(incrementPage(blogsList.count))
                                }}>Next</p>
                                <p style={{color: "black"}} className={styles.a}>Page: {blogsList.pageNumber}-{Math.ceil(blogsList.count / 6)}</p>
                            </div>
                        </div>
                    </div>
                )
        }
    }


    return (
        <div className={styles.body}>
            <NavigationBar />
            <header className={styles.header}>
                <h1 className={styles.h1}>Blogs</h1>
            </header>

            {getProcess()}
        </div>
    )
}

export default BlogsList
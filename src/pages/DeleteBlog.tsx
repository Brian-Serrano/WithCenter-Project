import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/DeleteBlog.module.css'
import '../css/Spinner.css'
import type { AppDispatch, RootState } from '../state/store'
import { useLoaderData, useNavigate } from 'react-router-dom'
import supabase from '../client/supabase-client'
import { changeError, onError, onSuccess } from '../state/delete-blog-slice'
import { useEffect } from 'react'
import NavigationBar from './NavigationBar'

function DeleteBlog() {
    const deleteBlog = useSelector((state: RootState) => state.deleteBlog)
    const dispatch = useDispatch<AppDispatch>()
    const onNavigate = useNavigate()
    const blogId = useLoaderData()

    const deleteBlogFunc = async () => {
        const { error } = await supabase.from("Blog").delete().eq('id', deleteBlog.id)

        if (error) {
            return dispatch(changeError(error.message))
        }
        else {
            return onNavigate("/")
        }
    }

    const getBlog = async () => {
        const { data, error } = await supabase.from("Blog")
            .select("id, title, user_id")
            .eq("id", blogId).single()

        if (error) {
            return dispatch(onError(error.message))
        }
        else {
            return dispatch(onSuccess({id: data.id, title: data.title, user_id: data.user_id, error: "", processState: "success"}))
        }
    }

    useEffect(() => {
        getBlog()
    }, [])

    const getProcess = () => {
        switch (deleteBlog.processState) {
            case "loading":
                return <div className="spinner"></div>
            case "failed":
                return <p>{deleteBlog.error}</p>
            case "success":
                return (
                    <div className={styles.card}>
                        <h2 className={styles.title}>Delete Blog Post</h2>
                        <p className={styles.description}>Are you sure you want to delete this blog post titled <strong>"{deleteBlog.title}"</strong>? This action cannot be undone.</p>
                    
                        <p className={styles.confirmation_text}>Type <strong>DELETE</strong> to confirm.</p>
                    
                        <button className={styles.delete_button} type="button" onClick={deleteBlogFunc}>Delete</button>
                    </div>
                )
        }
    }

    return (<div><NavigationBar /><div className={styles.body}>{getProcess()}</div></div>)
}

export default DeleteBlog
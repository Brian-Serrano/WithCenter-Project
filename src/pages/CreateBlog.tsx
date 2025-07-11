import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../state/store'
import styles from '../css/CreateBlog.module.css'
import { changeDescription, changeTitle, changeError } from '../state/create-blog-slice'
import { useNavigate } from 'react-router-dom'
import supabase from '../client/supabase-client'
import NavigationBar from './NavigationBar'

function CreateBlog() {
    const createBlog = useSelector((state: RootState) => state.createBlog)
    const dispatch = useDispatch<AppDispatch>()
    const onNavigate = useNavigate()

    const createBlogFunc = async () => {
        if (!createBlog.title || !createBlog.description) {
            return dispatch(changeError("Please fill up all empty fields"))
        }
        if (createBlog.title.length < 8 || createBlog.title.length > 40) {
            return dispatch(changeError("Title should be 8-40 characters"))
        }
        if (createBlog.description.length < 100 || createBlog.description.length > 2000) {
            return dispatch(changeError("Description should be 100-2000 characters"))
        }

        const { error } = await supabase.from("Blog").insert({
            title: createBlog.title,
            description: createBlog.description,
            user_id: localStorage.getItem("user_id")
        }).single()

        if (error) {
            return dispatch(changeError(error?.message))
        }
        else {
            return onNavigate("/")
        }
    }

    return (
        <div>
            <NavigationBar />
            <div className={styles.body}>
                <div className={styles.form_container}>
                    <h2 className={styles.h2}>Create Blog</h2>
                    <form>
                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter title"
                            className={styles.input}
                            value={createBlog.title}
                            onChange={(event) => dispatch(changeTitle(event.target.value))} />

                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            className={styles.textarea}
                            value={createBlog.description}
                            onChange={(event) => dispatch(changeDescription(event.target.value))}></textarea>

                        <button type="button" className={styles.button} onClick={createBlogFunc}>Create</button>
                        <p style={{color: "red"}}>{createBlog.error}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog
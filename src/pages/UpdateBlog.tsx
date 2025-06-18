import '../css/CreateBlog.css'
import '../css/Spinner.css'
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import { useLoaderData, useNavigate } from "react-router-dom"
import { changeDescription, changeError, changeTitle, onError, onSuccess } from "../state/update-blog-slice"
import supabase from "../client/supabase-client"
import { useEffect } from 'react'
import NavigationBar from './NavigationBar'

function UpdateBlog() {
    const updateBlog = useSelector((state: RootState) => state.updateBlog)
    const dispatch = useDispatch<AppDispatch>()
    const onNavigate = useNavigate()
    const blogId = useLoaderData()

    const getBlog = async () => {
        const { data, error } = await supabase.from("Blog")
            .select("id, title, description, user_id")
            .eq("id", blogId).single()

        if (error) {
            return dispatch(onError(error.message))
        }
        else {
            return dispatch(onSuccess({id: data.id, title: data.title, description: data.description, user_id: data.user_id, error: "", processState: "success"}))
        }
    }

    const createBlogFunc = async () => {
        if (!updateBlog.title || !updateBlog.description) {
            return dispatch(changeError("Please fill up all empty fields"))
        }
        if (updateBlog.title.length < 8 || updateBlog.title.length > 40) {
            return dispatch(changeError("Title should be 8-40 characters"))
        }
        if (updateBlog.description.length < 100 || updateBlog.description.length > 2000) {
            return dispatch(changeError("Description should be 100-2000 characters"))
        }

        const { error } = await supabase.from("Blog").update({
            title: updateBlog.title,
            description: updateBlog.description
        }).eq('id', updateBlog.id).single()

        if (error) {
            return dispatch(changeError(error?.message))
        }
        else {
            return onNavigate("/")
        }
    }

    useEffect(() => {
        getBlog()
    }, [])

    const getProcess = () => {
        switch (updateBlog.processState) {
            case "loading":
                return <div className="spinner"></div>
            case "failed":
                return <p>{updateBlog.error}</p>
            case "success":
                return (
                    <div className="form-container">
                        <h2>Update Blog</h2>
                        <form>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter title"
                                value={updateBlog.title}
                                onChange={(event) => dispatch(changeTitle(event.target.value))} />

                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter description"
                                value={updateBlog.description}
                                onChange={(event) => dispatch(changeDescription(event.target.value))}></textarea>

                            <button type="button" onClick={createBlogFunc}>Update</button>
                            <button type="button" onClick={() => onNavigate(`/delete-blog/${updateBlog.id}/${updateBlog.user_id}`)}>Delete</button>
                            <p style={{color: "red"}}>{updateBlog.error}</p>
                        </form>
                    </div>
                )
        }
    }

    return (<div><NavigationBar />{getProcess()}</div>)
}

export default UpdateBlog
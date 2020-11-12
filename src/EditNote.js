import { useState } from 'react';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import { notify } from 'react-notify-toast';


const NOTE_QUERY = gql`
query getNote($_id: ID!){
    getNote(_id: $_id){
        _id,
        title,
        content,
        date
    }
}
`;

const UPDATE_NOTE = gql`
mutation updateNote($_id: ID!, $title: String!, $content: String!){
    updateNote(_id: $_id, input: {title: $title, content: $content}){
        _id,
        title,
        content
    }
}`;


const EditNote = ({ match }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editing, setEditing] = useState(false);
    const { loading, error, data } = useQuery(NOTE_QUERY, {
        variables: {
            _id: match.params.id
        }
    });

    let history = useHistory();
    const [updateNote] = useMutation(UPDATE_NOTE);
    if(loading) return <div> Fetching Note</div>;
    if(error) return <div>Error fetching note</div>;

    const note = data;
    return (
        <div className="container m-t-20">
            <h1 className="page-title">Edit Note</h1>
            <div className="newnote-page m-t-20">
                <form 
                    onSubmit = {
                        e => {
                            e.preventDefault();
                            setEditing(true);
                            updateNote({
                                variables: {
                                    _id: note.getNote._id,
                                    title: title ? title: note.getNote.title,
                                    content: content ? content: note.getNote.content
                                }
                            }).then(() => {
                                setEditing(false);
                                notify.show("Note was edited successfully", "success");
                                history.push("/");
                            }); 
                    }}
                >
                    <div className="field">
                        <label htmlFor="" className="label">Note Title</label>
                        <div className="control">
                            <input 
                                type="text" 
                                placeholder="Note Title" 
                                className="input" 
                                defaultValue={note.getNote.title}
                                onChange = {
                                    e => setTitle(e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="" className="label">Note Content</label>
                        <div className="control">
                            <textarea 
                                placeholder="Note Content" 
                                rows="10" 
                                className="textarea"
                                defaultValue={note.getNote.content}
                                onChange={
                                    e => setContent(e.target.value)
                                }
                                required
                                ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link" type="submit">
                                <p>Submit</p>
                                { editing ? <span className="ml-15 loader"></span> : null}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNote;

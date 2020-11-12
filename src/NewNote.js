import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import { notify } from 'react-notify-toast';

const NEW_NOTE = gql`
mutation createNote($title: String!, $content: String!){
    createNote(input: {title: $title, content: $content}){
        _id,
        title,
        content,
        date
    }
}
`;


const NOTES_QUERY = gql`
{
    allNotes{
        title
        content
        _id
        date
    }
}
`;



const NewNote = () => {

    let history = useHistory();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [adding, setAdding] = useState(false);

    const [createNote] = useMutation(NEW_NOTE, {
        update(cache, {
            data: { createNote }
        }){
            const { allNotes } = cache.readQuery({ query: NOTES_QUERY });
            cache.writeQuery({ 
                query: NOTES_QUERY,
                data: {
                    allNotes: allNotes.concat([createNote])
                }
            });

        }
    });
    return (
        <div className="container m-t-20">
            <h1 className="page-title">New Note</h1>
            <div className="newnote-page mt-20">
                <form 
                    onSubmit = {e => {
                        e.preventDefault();
                        setAdding(true);
                        createNote({
                            variables: {
                                title,
                                content,
                                date: Date.now()
                            }
                        }).then(() => {
                            setAdding(false);
                            history.push("/");
                            notify.show("Note was added successfully", "success");
                            
                        }); 
                    }}
                >
                    <div className="field">
                        <label htmlFor="" className="label">Note Title</label>
                        <div className="control">
                            <input type="text" 
                                placeholder="Note Title" 
                                className="input"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="" className="label">Note Content</label>
                        <div className="control">
                            <textarea type="text" 
                                placeholder="Note Content here..." 
                                className="textarea" 
                                rows="10"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link">
                                <p className = "mr-15">Submit</p>
                                { adding ? <span className="ml-15 loader"></span> : null }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default NewNote;

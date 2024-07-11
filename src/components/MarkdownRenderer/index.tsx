import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MarkdownRenderer = ({ url }: { url:any}) => {

    const [markdown, setMarkdown] = useState<string>(url)

    // useEffect(() => {
    //     const fetchMarkdown = async () => {
    //         try {
    //             axios.get(url)
    //             .then(function (response) {
    //                 const text = response.data.text()
    //                 setMarkdown(text)
    //             })
    //             .catch(function (error) {
    //                 console.error('Erro ao buscar o arquivo Markdown SS: ', error)
    //             })
    //         } catch (error) {
    //             console.error('Erro ao buscar o arquivo Mardown AX: ', error)
    //         }
    //     }
    //     fetchMarkdown()
    // }, [url])

    return (
        <div className=''>
            <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </div>
    )
}

export default MarkdownRenderer
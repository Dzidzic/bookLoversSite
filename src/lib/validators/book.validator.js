import yup from 'yup';

// @ts-ignore
export default async function validate(formData) {
    // @ts-ignore
    console
    
    const schema = yup.object({
        title: yup.string().required('Book title is required').min(4).max(40),
        author: yup.string().required().max(100),
        short_description: yup.string().required().min(2).max(100),
        description: yup.string().required().min(2).max(2000),
        small_picture: yup
            .mixed()
            .required()
            .test('fileType', 'The file must be an image', (value) => {
                // @ts-ignore
                if(value && value.type) {
                    // @ts-ignore
                    return ['image/png', 'image/jpeg'].includes(value.type);
                }
                return true;
            })
            .test('fileSize', 'The file must be under 4 MB', (value) => {
                // @ts-ignore
                if(value && value.size) {
                    // @ts-ignore
                    return value.size < 4_000_000;
                }
                return true;
            }),
        main_picture: yup
            .mixed()
            .required()
            .test('fileType', 'The file must be an image', (value) => {
                // @ts-ignore
                if(value && value.type) {
                    // @ts-ignore
                    return ['image/png', 'image/jpeg'].includes(value.type);
                }
                return true;
            })
            .test('fileSize', 'The file must be under 10 MB',
            (value) => {
                // @ts-ignore
                if(value && value.size) {
                    // @ts-ignore
                    return value.size < 10_000_000;
                }
                return true;
            })  
    });

    const data = {
        title: formData.get('title'),
        author: formData.get('author'),
        description: formData.get('description'),
        short_description: formData.get('short_description'),
        main_picture: formData.get('main_picture'),
        small_picture: formData.get('small_picture')      
    }

    try {
        await schema.validate(data, { abortEarly: false });

        return { success: true, book: data };
    } catch (error) {
        // @ts-ignore
        const errors = error.inner.reduce((agg, e) => {
            if(!agg['error_' + e.path]){
                agg['error_' + e.path] = e.message;
            }
            return agg;
        }, {});

        delete data.main_picture;
        delete data.small_picture;

        return {...errors, ...data, success: false};
    }
}
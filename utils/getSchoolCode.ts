export const getSchoolID = (email: string) => {
    let emailParts:string[] = email.split('@')
    return emailParts[1] // should be 'sfu.ca' or 'ubc.ca'
}
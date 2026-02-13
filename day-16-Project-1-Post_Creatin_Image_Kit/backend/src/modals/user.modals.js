const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User already exist with this username"],
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        unique: [true, "User already exist with this email"],
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password field is required"],
    },
    bio: {
        type: String,
    },
    profileUrl: {
        type:String,
        default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAtQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBBAcCA//EADQQAAICAQICBggFBQAAAAAAAAABAgMEBREGIRIxQVFxkRMUIjJSYYGxQqHB4fEjJGKS0f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDsoAAAAAAAAAAA187Ox8Cr0uTYorsXbLwIKfF0FZtDDk69/elZs3+QFlM7PufkVDUuJ7rY9DBhKmLXOcuct+5EHbfdbJyttsm33ybA6W011pmDnmJqmbhy3pyJ7LrjJ9JfmWLTuKKbWq82v0Uvjjzj+wFhBiE42RU4SUovqa5oyAAAAAAAAAAAAAAAAAAAA0tY1COm4Ur9t5v2YLvbN0qvGlzd+NTvyUXP69QEBk5N2VbK7Isdk32s+IAAAAAABJaNq12m28vax2/arf3XzL3VZG6uNlb3hJJp/I5kXbhS53aQoyb3qm4Lw5P9QJkAAAAAAAAAAAAAAAAAACl8XtvVUu6pfdl0Kvxnje1j5XZt0H91+oFYAAAAAAAALdwVv6nk93peX+qKiXfhOj0Okxm+u6bn9OpfYCYAAAAAAAAAAAAAAAAAAAqXFGrTsut0+MIOuG3SbW76XXy7i2lF4nqdWs3yfJWbTj4bJARQAAAAAAAB0DRMujLwYerKSjVtW1LrWyOflx4NrcdOts+O5/kkgJ4AAAAAAAAAAAAAAAAAACC4rwJZWLXfRW521S2cYrm0ydMgcytrnTOVdsHGcXs4vrR4J7i7F9FqCyIpdG6PN/5IgQAAAAADMYym1GMXJtpJI6LpuL6ngU4++7hH2n8+tkRwfiuvCsyZrndLaPgu3z+xYAAAAAAAAAAAAAAAAAAAAAACN4iw/W9KtXVKpdOL8P2KFyOh6zZ6PSsuXZ6Jrz5HPAAAAG1pmHLPzaseLUek9232Jc2apJ8NzUNax9/xbx80wLzTXCmmFVcejCC2S+R7MmAAAAAAAAAAAAAAAAAABq5eoYmHv6zfCD7t935AbRiUlGLlJqMVzbb5FfzOKqIprEolZLslP2V5dZXdQ1LK1Df1izeG/KEeUQJbiTWqsuv1PEfSr6W87OyW3YvkV0AAAAB7pslTbCyt7ThJSi/mjwAL7pOtY2oQUd1Vf21yfX4d5JnL1ummm011NMmsDiPMxUoXJZFa7JP2vMC6gh8biXT7+Vkp0S7px3XmS1Vtd0FZTOM4Pti90B6AAAAAAAAAABtJbtpJdrIbO4jwsbeNTeRPug9l5kNxNq08nIniUyaoqe0tn78l+hBASudxBnZe6jL0EH+Gvk39SLfW23u+/vMAAAAAAAAAAAAAAAH1xsi7Gn08eyVc++L2PkALFhcVXV7RzaVavihyl/wsODqeJnrbHuTl8EuUvI54eoScJqcJOM0900+YHTQRXD2pvUcVq5/3FXKb+LuZKgAAANXVMn1TAvv32cY+z49htEBxlf0MCqle9ZPdr5L+UBTwAAAAAAAAAAAAAAAAAAAAAAASnDWS8fVqt5bRs/pv6/wXs5lCbqsjZH3oNSX0OlUWK2mFsfdnFSX1QHsAACocZzbzseL6o1br6v8AYACvgAAAAAAAAAAAAAAAAAAAAAAAF/4em56Njb9icV4JswAJEAAf/9k="
    }
})

const userModal = mongoose.model("User", userSchema);

module.exports = userModal;
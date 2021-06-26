
class InternalServerError(Exception):
    pass

class SchemaValidationError(Exception):
    pass

class MovieAlreadyExistsError(Exception):
    pass

class UpdateMovieError(Exception):
    pass

class DeleteMovieError(Exception):
    pass

class EmailAlreadyExistsError(Exception):
    pass

class UnauthorizedError(Exception):
    pass

errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields",
        "status": 400
    },
    "MovieAlreadyExistsError": {
        "message": "Movie with given name already exists",
        "status": 400
    },
    "UpdateMovieError": {
        "message": "Updating movie added by other is forbidden",
        "status": 403
    },
    "DeleteMovieError": {
        "message": "Deleting movie added by other is forbidden",
        "status": 403
    },
    "MovieNotExistError": {
        "message": "Movie with given id does'nt exists",
        "status": 400
    },
    "UnathorizedError": {
        "message": "Invalid username or password",
        "status": 401
    }
}
const noteCtrl = {
};

const Note = require('../models/note');
noteCtrl.renderNoteForm = (req, res)=>{
    res.render('notes/new-notes');
};

noteCtrl.createNewNote = async(req,res)=>{
    const { title, description} = req.body;
    const newNote = new Note({title, description})
    newNote.user = req.user.id;
    await  newNote.save();
    req.flash('enviarMensaje','Nota agregrada');
    res.redirect('/notes');
};

noteCtrl.renderNotes = async(req,res)=>{
  const notes=  await Note.find({user:req.user.id}).sort({timestamp: -1}).lean();
 res.render('notes/all-notes', { notes });
};

noteCtrl.renderEditForm = async(req, res)=>{
   const note = await Note.findById(req.params.id).sort({timestamp: -1}).lean();
   if(note.user != req.user.id){
       req.flash('mensajeError','No autorizado');
       return res.redirect('/notes');
   }
    console.log(note);
    res.render('notes/edit-note',{note});
};

noteCtrl.updateNote = async(req, res)=>{
   const { title, description} = req.body;
   await Note.findByIdAndUpdate(req.params.id,{ title, description });
   req.flash('enviarMensaje','Nota Actulizada');
    res.redirect('/notes');
};

noteCtrl.deleteNote =async (req,res) =>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('enviarMensaje','Nota Eliminada');
    res.redirect('/notes');
};


module.exports = noteCtrl;
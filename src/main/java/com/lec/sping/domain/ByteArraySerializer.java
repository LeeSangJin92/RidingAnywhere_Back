package com.lec.sping.domain;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

@JsonComponent
public class ByteArraySerializer extends JsonSerializer<Blob> {

    @Override
    public void serialize(Blob value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        try {
            byte[] bytes = value.getBytes(1, (int) value.length());
            gen.writeBinary(bytes);
        } catch (SQLException e) {
            throw new IOException("Error serializing Blob to byte array", e);
        }
    }
}